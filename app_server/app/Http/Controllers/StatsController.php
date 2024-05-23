<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ClientFile;
use App\Models\ClientFileAddress;
use App\Models\Commune;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    /*function index(): \Illuminate\Http\JsonResponse
    {
        $topCommunes = Commune::select('communes.id', 'communes.name', DB::raw('COUNT(client_files.id) as client_files_count'))
        ->join('client_files', 'communes.id', '=', 'client_files.commune_id')
        ->groupBy('communes.id', 'communes.name')
        ->havingRaw('COUNT(client_files.id) > 0')
        ->orderBy('client_files_count', 'desc')
        ->take(4)
        ->get();

        $communeIds = $topCommunes->pluck('id')->toArray();
        $trendingCommune = ClientFileAddress::whereIn('commune_id', $communeIds)
            ->with('commune.clientFiles')
            ->get();

        $fullAddresses = ClientFileAddress::all();

        $response = [
            'message' => 'success',
            'trendingCommune' => $topCommunes,
            'fullAddresses' => $trendingCommune
        ];
        return response()->json($response, 200);
    }*/


    function index(): \Illuminate\Http\JsonResponse
    {
        $productsCount = count(Product::all());
        $clientsCount = count(Client::all());
        $clientFilesCount = count(ClientFile::all());
        $suppliersCount = count(Supplier::all());

        $response = [
            'message' => 'success',
            'productsCount' => $productsCount,
            'clientFilesCount' => $clientFilesCount,
            'clientsCount' => $clientsCount,
            'suppliersCount' => $suppliersCount,
        ];
        return response()->json($response, 200);
    }

    function searchByCommune($input): \Illuminate\Http\JsonResponse
    {
        $searchPrompt = '%' . strtoupper($input) . '%';
        $communeWithFiles = ClientFileAddress::with(['commune.clientFiles'])
            ->whereHas('commune', function ($query) use ($searchPrompt) {
                $query->where('full_address', 'like', $searchPrompt);
            })
            ->get();
        $response = [
            'message' => 'success',
            'searchedCommune' => $communeWithFiles
        ];
        return response()->json($response, 200);
    }

    function getCommunes(): \Illuminate\Http\JsonResponse
    {
        $communes = ClientFileAddress::all();
        $response = [
            'message' => 'success',
            'communes' => $communes
        ];
        return response()->json($response, 200);
    }
}
