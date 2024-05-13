<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $products = Product::all();
        $response = [
            'message' => 'success',
            'products' => $products
        ];
        return response()->json($response, 200);
    }

    function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string',
            'model' => 'required|string',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'name',
            'brand',
            'model',
        );

        $product = Product::create($data);
        $response = [
            'status' => 'success',
            'message' => 'Product is created successfully.',
            'product' => $product,
        ];
        return response()->json($response);
    }

    function update()
    {

    }

    function destroy($id): \Illuminate\Http\JsonResponse
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json([
            'status' => 'Product Deleted Successfully'
        ]);
    }

}
