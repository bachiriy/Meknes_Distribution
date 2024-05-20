<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function index()
    {
        $categories = Category::with('groups')->get();
        $response = [
            'message' => 'success',
            'categories' => $categories
        ];
        return response()->json($response, 200);
    }
}
