<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $clients = Client::all();
        $response = [
            'message' => 'success',
            'clients' => $clients
        ];
        return response()->json($response, 200);
    }

    function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CIN_ICE' => 'required|string',
            'type' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address_exploitation' => 'required|string',
            'address_facturation' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'CIN_ICE',
            'type',
            'first_name',
            'last_name',
            'email',
            'phone',
            'address_exploitation',
            'suite_address_exploitation',
            'address_facturation',
            'suite_address_facturation',
        );

        $client = Client::create($data);
        $response = [
            'status' => 'success',
            'message' => 'Client is created successfully.',
            'client' => $client,
        ];
        return response()->json($response);
    }

    function update()
    {

    }

    function destroy($id): \Illuminate\Http\JsonResponse
    {
        $client = Client::find($id);
        $client->delete();
        return response()->json([
            'status' => 'Client Deleted Successfully'
        ]);
    }
}
