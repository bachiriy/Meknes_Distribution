<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function index()
    {
        $categories = Category::where('is_deleted', 'no')
            ->with('groups')->get();
        $response = [
            'message' => 'success',
            'categories' => $categories
        ];
        return response()->json($response, 200);
    }

    function softDelete($id): \Illuminate\Http\JsonResponse
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $category = Category::find($id);
        $category->is_deleted = 'yes';
        $category->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Category Moved to the Archive Successfully',
        ]);
    }
}
