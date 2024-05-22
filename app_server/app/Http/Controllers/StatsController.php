<?php

namespace App\Http\Controllers;

use App\Models\ClientFileAddress;
use App\Models\Commune;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $topCommunes = Commune::select('communes.*', DB::raw('COUNT(client_files.id) as client_files_count'))
            ->join('client_files', 'communes.id', '=', 'client_files.commune_id')
            ->groupBy('communes.id')
            ->havingRaw('COUNT(client_files.id) > 0')
            ->orderBy('client_files_count', 'desc')
            ->take(5)
            ->get();

        $communeIds = $topCommunes->pluck('id')->toArray();
        $fullAddresses = ClientFileAddress::whereIn('commune_id', $communeIds)
            ->with('commune.clientFiles')
            ->get();

        $response = [
            'message' => 'success',
            'trendingCommune' => $fullAddresses
        ];
        return response()->json($response, 200);
    }
}
