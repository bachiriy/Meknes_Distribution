<?php

namespace App\Http\Controllers;

use App\Models\ClientFile;
use App\Models\ClientFileAddress;
use App\Models\ClientFileProduct;
use App\Models\ClientPartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

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

        $clientFiles = ClientFile::where('is_deleted', 'no')
            ->with('invoices')
            ->with('deliveryNotes')
            ->with('commune.caidat.cercle.province.region')
            ->with('products.subCategory.category')
            ->with('clients')
            ->get();

        Cache::forget('client_files');
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

    function softDelete($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:clientFiles,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $clientFile = ClientFile::find($id);
        $clientFile->is_deleted = 'yes';
        $clientFile->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Client File Moved to the Archive Successfully',
        ]);
    }

    function destroy($id): \Illuminate\Http\JsonResponse
    {
        $clientFile = ClientFile::find($id);
        $clientFile->delete();
        return response()->json([
            'status' => 'Client File Deleted Successfully'
        ]);
    }
}
