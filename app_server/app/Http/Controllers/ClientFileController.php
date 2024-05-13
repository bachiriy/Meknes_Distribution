<?php

namespace App\Http\Controllers;

use App\Models\ClientFile;
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
            'client_id' => 'required|numeric|exists:client,id',
            'hood_id' => 'required|numeric|exists:hood,id',
            'product_id' => 'required|numeric|exists:product,id',
            'exploitation_address' => 'required|string',
            'exploitation_surface' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'client_id',
            'hood_id',
            'product_id',
            'exploitation_address',
            'exploitation_surface'
        );

        $clientFile = ClientFile::create($data);
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
