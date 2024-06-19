<?php

namespace App\Http\Controllers;

use App\Models\ClientFile;
use App\Models\ClientFileAddress;
use App\Models\ClientFileProduct;
use App\Models\ClientPartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\MediaLibrary\Support\MediaStream;
use ZipArchive;

class ClientFileController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $clientFiles = Cache::get('client_files');

        if (!$clientFiles) {
            $clientFiles = ClientFile::where('is_deleted', 'no')
                ->with('invoices')
                ->with('deliveryNotes')
                ->with('commune.caidat.cercle.province.region')
                ->with('products.subCategory.category')
                ->with('clients')
                ->get();
            Cache::put('client_files', $clientFiles, 1440);
        }

        $response = [
            'message' => 'success',
            'clientFiles' => $clientFiles
        ];
        return response()->json($response, 200);
    }

    function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'file_name' => 'required|string|max:255',
            'client_ids' => 'required|array',
            'client_ids.*' => 'required|numeric|exists:clients,id',
            'commune_id' => 'required|numeric|exists:communes,id',
            'product_ids' => 'required|array',
            'product_ids.*' => 'required|numeric|exists:products,id',
            'exploitation_surface' => 'required|numeric',
            'files' => 'nullable|file',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'file_name',
            'commune_id',
            'more_detail',
            'exploitation_surface'
        );

        $fullAddress = ClientFileAddress::where('commune_id', $data['commune_id'])->first();
        $data['full_address'] = $fullAddress['full_address'];

        $clientFile = ClientFile::create($data);

        // Attach clients and products
        foreach ($request['client_ids'] as $id) {
            ClientPartner::create([
                'client_file_id' => $clientFile->id,
                'client_id' => $id
            ]);
        }

        foreach ($request['product_ids'] as $id) {
            ClientFileProduct::create([
                'client_file_id' => $clientFile->id,
                'product_id' => $id
            ]);
        }

        // Handle file upload with Media Library
        if ($request->hasFile('files')) {
            $clientFile->addMedia($request->file('uploadFiles'))->toMediaCollection('client_files');
        }

        // Clear cache and return response
        Cache::forget('client_files');
        Cache::forget('clients');
        Cache::forget('products');
        $clientFiles = ClientFile::where('is_deleted', 'no')
            ->with('invoices')
            ->with('deliveryNotes')
            ->with('commune.caidat.cercle.province.region')
            ->with('products.subCategory.category')
            ->with('clients')
            ->get();
        Cache::put('client_files', $clientFiles, 1440);

        $response = [
            'status' => 'success',
            'message' => 'ClientFile is created successfully.',
            'clientFile' => $clientFile,
            'clientFiles' => $clientFiles,
        ];

        return response()->json($response);
    }

    function update()
    {

    }

    function download($id): \Symfony\Component\HttpFoundation\BinaryFileResponse|\Illuminate\Http\JsonResponse
    {
        // Validate the provided ID
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric|exists:client_files,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the ClientFile by ID
        $clientFile = ClientFile::find($id);

        // Get all the media files associated with the ClientFile
        $medias = $clientFile->getMedia('*');

        if (!$medias) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        // Create a temporary directory
        $tempFolderName = 'temp_' . Str::random(10);
        Storage::disk('public')->makeDirectory($tempFolderName);

        // Move media files into the temporary directory
        foreach ($medias as $media) {
            Storage::disk('public')->move($media->getPath(), $tempFolderName . '/' . $media->file_name);
        }

        // Zip the temporary directory
        $zipFileName = $tempFolderName . '.zip';
        $zipFilePath = storage_path('app/public/' . $zipFileName);
        $zip = new ZipArchive;
        $zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        $files = Storage::disk('public')->files($tempFolderName);
        foreach ($files as $file) {
            $zip->addFile(storage_path('app/public/' . $file), $file);
        }
        $zip->close();

        // Delete the temporary directory
        Storage::disk('public')->deleteDirectory($tempFolderName);

        // Return the zip file as a download response
        return response()->download($zipFilePath, $clientFile->file_name . '.zip')->deleteFileAfterSend(true);
    }

    function fileDownload($clientFileId, $fileId): \Symfony\Component\HttpFoundation\BinaryFileResponse|\Illuminate\Http\JsonResponse
    {
        $validator = Validator::make(['file_id' => $fileId, 'client_file_id' => $clientFileId], [
            'file_id' => 'required|numeric|exists:medias,id',
            'client_file_id' => 'required|numeric|exists:client_files,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clientFile = ClientFile::find($clientFileId);

        $medias = $clientFile->getMedia("*");
        $media = $medias->where('id', $fileId)->first();
        return response()->download($media->getPath(), $media->file_name);
    }

    function filesDownload($clientFileId, $fileId): MediaStream|\Illuminate\Http\JsonResponse
    {
        $validator = Validator::make(['file_id' => $fileId, 'client_file_id' => $clientFileId], [
            'file_id.*' => 'required|numeric|exists:medias,id',
            'client_file_id' => 'required|numeric|exists:client_files,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clientFile = ClientFile::find($clientFileId);

        $medias = $clientFile->getMedia("*");
        $media = $medias->where('id', $fileId)->get();
        $zipName = $clientFile->file_name . '.zip';
        return MediaStream::create($zipName)->addMedia($media);
    }

    function rename(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fileId' => 'required|numeric|exists:client_files,id',
            'newName' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clientFile = ClientFile::find($request->input('fileId'));
        if ($clientFile) {
            $clientFile->file_name = $request->input('newName');
            $clientFile->save();
            Cache::forget('client_files');
        }

        return response()->json(['success' => true]);
    }

    function softDelete($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:client_files,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $clientFile = ClientFile::findOrFail($id);
        $clientFile->is_deleted = 'yes';
        $clientFile->save();
        Cache::forget('client_files');
        return response()->json([
            'status' => 'success',
            'message' => 'Client File Moved to the Archive Successfully',
        ]);
    }

    function delete($id): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make(['id' => $id], [
            'fileId' => 'required|numeric|exists:client_files,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clientFile = ClientFile::find($request->input('fileId'));
        if ($clientFile) {
            $clientFile->delete();
            Cache::forget('client_files');
        }

        return response()->json(['success' => true]);
    }

    function upload(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'client_file_id' => 'required|numeric|exists:client_files,id',
            'uploadFiles' => 'required|array', // Require files to be uploaded
            'uploadFiles.*' => 'file', // Each item should be a file
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Start a database transaction
        DB::beginTransaction();

        try {
            $clientFileId = $request->input('client_file_id');
            $clientFile = ClientFile::findOrFail($clientFileId);

            // Handle multiple file uploads
            if ($request->hasFile('uploadFiles')) {
                foreach ($request->file('uploadFiles') as $file) {
                    $clientFile->addMedia($file)->toMediaCollection('client_files');
                }
            }

            // Commit the transaction
            DB::commit();

            // Clear cache and return response
            Cache::forget('client_files');
            $clientFiles = ClientFile::where('is_deleted', 'no')
                ->with('invoices')
                ->with('deliveryNotes')
                ->with('commune.caidat.cercle.province.region')
                ->with('products.subCategory.category')
                ->with('clients')
                ->get();
            Cache::put('client_files', $clientFiles, 1440);

            $response = [
                'status' => 'success',
                'message' => 'Files attached to ClientFile successfully.',
                'clientFile' => $clientFile,
                'clientFiles' => $clientFiles,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();

            // Log the error or handle it appropriately
            return response()->json(['message' => 'Error occurred while attaching files to client file.'], 500);
        }
    }
}
