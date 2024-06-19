<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Validator;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Cache::get('suppliers');
        if (!$suppliers) {
            $suppliers = Supplier::where('is_deleted', 'no')->get();
            Cache::put('suppliers', $suppliers, 1440);
        }
        $response = [
            'message' => 'success',
            'suppliers' => $suppliers
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'remise_f_composition' => 'required|string',
            'remise_f' => 'required|numeric',
            'date_debut' => 'required|date|after_or_equal:now',
            'date_fin' => 'nullable|date|after_or_equal:now',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'name',
            'remise_f_composition',
            'remise_f',
            'date_debut',
            'date_fin',
        );

        $client = Supplier::create($data);
        Cache::forget('suppliers');
        $response = [
            'status' => 'success',
            'message' => 'Supplier is created successfully.',
            'supplier' => $client,
        ];
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }


    function softDelete($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:suppliers,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $supplier = Supplier::find($id);
        $supplier->is_deleted = 'yes';
        $supplier->save();
        Cache::forget('suppliers');
        return response()->json([
            'status' => 'success',
            'message' => 'Product Moved to the Archive Successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    function destroy(string $id)
    {
        $supplier = Supplier::find($id);
        $supplier->delete();
        Cache::forget('suppliers');
        Cache::forget('products');
        return response()->json([
            'status' => 'Success',
            'message' => 'Supplier Deleted Successfully'
        ]);
    }
}
