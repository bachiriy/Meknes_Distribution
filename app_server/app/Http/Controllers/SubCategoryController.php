<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class SubCategoryController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $subCategories = Cache::get('subCategories');
        if (!$subCategories) {
            $subCategories = SubCategory::with('category')->get();
            Cache::put('subCategories', $subCategories, 1440);
        }
        $response = [
            'message' => 'success',
            'categories' => $subCategories
        ];
        return response()->json($response, 200);
    }

    function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:sub_categories',
            'category_id' => 'required|string|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        SubCategory::create(
            [
                'name' => $request['name'],
                'category_id' => $request['category_id']
            ]);
        $subCategories = SubCategory::with('category')->get();
        Cache::forget('subCategories');
        Cache::forget('categories');
        Cache::put('subCategories', $subCategories, 1440);
        $response = [
            'message' => 'success',
            'categories' => $subCategories
        ];
        return response()->json($response, 200);
    }

    function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $validator = validator([
            'id' => $id,
            'name' => $request->name,
            'category_id' => $request['category_id']
        ], [
            'id' => 'required|numeric|exists:sub_categories,id',
            'category_id' => 'required|numeric|exists:categories,id',
            'name' => 'required|string|unique:sub_categories'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subCategory = SubCategory::find($id);
        $subCategory->name = $request->name;
        $subCategory->category_id = $request->category_id;
        $subCategory->save();

        $subCategories = SubCategory::with('category')->get();
        Cache::forget('subCategories');
        Cache::forget('categories');
        Cache::put('subCategories', $subCategories, 1440);
        $response = [
            'message' => 'success',
            'categories' => $subCategories
        ];
        return response()->json($response, 200);
    }

    function destroy($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:sub_categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $subCategory = SubCategory::find($id);
        $subCategory->delete();
        Cache::forget('subCategories');
        Cache::forget('categories');
        return response()->json([
            'status' => 'success',
            'message' => 'SubCategory Deleted Successfully',
        ]);
    }
}
