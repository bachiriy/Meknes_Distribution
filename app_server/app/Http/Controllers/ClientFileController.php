<?php

namespace App\Http\Controllers;

use App\Models\ClientFile;
use App\Models\ClientPartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientFileController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $clientFiles = ClientFile::all();
        $response = [
            'message' => 'success',
            'clientFiles' => $clientFiles
        ];
        return response()->json($response, 200);
    }

    function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'client_ids.*' => 'required|numeric|exists:clients,id',
            'commune_id' => 'required|numeric|exists:communes,id',
            'product_id' => 'required|numeric|exists:products,id',
            'exploitation_surface' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'commune_id',
            'product_id',
            'exploitation_surface'
        );

        $clientFile = ClientFile::create($data);

        foreach ($request['client_ids'] as $id) {
            ClientPartner::create([
                'client_file_id' => $clientFile->id,
                'client_id' => $id
            ]);
        }

        $response = [
            'status' => 'success',
            'message' => 'ClientFile is created successfully.',
            'clientFile' => $clientFile,
        ];
        return response()->json($response);
    }

    function update()
    {

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
