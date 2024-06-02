<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $categories = Cache::get('categories');
        if (!$categories) {
            $categories = Category::with('subCategories')->get();
            Cache::put('categories', $categories, 1440);
        }
        $response = [
            'message' => 'success',
            'categories' => $categories
        ];
        return response()->json($response, 200);
    }

    function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make(['name' => $request['name']], [
            'name' => 'required|string|unique:categories'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        Category::create(['name' => $request['name']]);
        $categories = Category::with('subCategories')->get();
        Cache::forget('categories');
        Cache::put('categories', $categories, 1440);
        $response = [
            'message' => 'success',
            'categories' => $categories
        ];
        return response()->json($response, 200);
    }

    function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $validator = validator([
            'id' => $id,
            'name' => $request->name
        ], [
            'id' => 'required|numeric|exists:categories,id',
            'name' => 'required|string|unique:categories'

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::find($id);
        $category->name = $request->name;
        $category->save();
        $categories = Category::with('subCategories')->get();

        Cache::forget('categories');
        Cache::forget('subCategories');
        Cache::put('categories', $categories, 1440);
        $response = [
            'message' => 'success',
            'categories' => $categories
        ];
        return response()->json($response, 200);
    }

    function destroy($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $category = Category::find($id);
        $category->delete();
        Cache::forget('categories');
        Cache::forget('subCategories');
        return response()->json([
            'status' => 'success',
            'message' => 'Category Deleted Successfully',
        ]);
    }
}
