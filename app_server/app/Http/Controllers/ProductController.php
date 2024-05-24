<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $products = Cache::get('products');
        if (!$products) {
            $products = Product::where('is_deleted', 'no')
                ->with(['sub_category.category', 'supplier'])
                ->get();
            Cache::put('products', $products, 1440);
        }
        $response = [
            'message' => 'success',
            'products' => $products
        ];
        return response()->json($response, 200);
    }

    function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'reference' => 'required|string',
            'designation' => 'required|string',
            'prix_tarif' => 'required|numeric',
            'prix_achat' => 'required|numeric',
            'prix_vente' => 'required|numeric',
            'marge_brut' => 'required|numeric',
            'remise' => 'required|numeric',
            'TVA' => 'required|numeric',
            'prix_vente_net' => 'required|numeric',
            'sub_category_id' => 'required|numeric|exists:sub_categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (isset($request->image)) {
            $validator = Validator::make($request->all(), [
                'image' => 'required|file|mimes:jpg,png,jpeg'
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
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
            'sub_category_id',
            'supplier_id'
        );

        $path = $request->file('image')->store('products/picture', 'public');
        $product = Product::create($data);
        $product->addMedia(storage_path('app/public/' . $path))->toMediaCollection('product_picture');
        $mediaItems = $product->getMedia('user_picture');
        $publicUrl = $mediaItems[0]->getUrl();
        $product->image = $publicUrl;
        $product->save();
        Cache::forget('products');
        $products = Product::with(['sub_category.category', 'supplier'])
            ->get();
        Cache::put('products', $products, 1440);
        $response = [
            'status' => 'success',
            'message' => 'Product is created successfully.',
            'product' => $product,
            'products' => $products,
        ];
        return response()->json($response);
    }

    function update()
    {

    }

    function softDelete($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:products,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $product = Product::find($id);
        $product->is_deleted = 'yes';
        $product->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Product Moved to the Archive Successfully',
        ]);
    }

    function destroy($id): \Illuminate\Http\JsonResponse
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json([
            'status' => 'Success',
            'message' => 'Product Deleted Successfully',
        ]);
    }

}
