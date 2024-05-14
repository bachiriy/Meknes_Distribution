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
            'reference' => 'required|string',
            'designation' => 'required|string',
            'image' => 'required|string',
            'prix_tarif' => 'required|numeric',
            'prix_achat' => 'required|numeric',
            'prix_vente' => 'required|numeric',
            'marge_brut' => 'required|numeric',
            'remise' => 'required|numeric',
            'TVA' => 'required|numeric',
            'prix_vente_net' => 'required|numeric',
            'category_id' => 'required|numeric|exists:categories,id',
            'group_id' => 'required|numeric|exists:groups,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only(
            'reference',
            'designation',
            'image',
            'prix_tarif',
            'prix_achat',
            'prix_vente',
            'marge_brut',
            'remise',
            'TVA',
            'prix_vente_net',
            'category_id',
            'group_id'
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
