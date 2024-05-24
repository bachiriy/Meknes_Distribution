<?php

namespace Database\Seeders;

use App\Models\ClientFile;
use App\Models\ClientFileProduct;
use App\Models\ClientPartner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clientFiles = [
            [
                'file_name' => 'test 1',
                'commune_id' => 271,
                'exploitation_surface' => 400.5,
                'full_address' => "FES - MEKNES, BOULEMANE, BOULMANE (M)",

            ],
            [
                'file_name' => 'test 2',
                'full_address' => "FES - MEKNES, BOULEMANE, BOULMANE (M)",
                'client_ids' => [1, 2],
                'commune_id' => 271,
                'product_ids' => [2, 3],
                'exploitation_surface' => 33300.5,
            ],
            [
                'file_name' => 'test 3',
                'client_ids' => [3, 2],
                'commune_id' => 271,
                'product_ids' => [1, 3],
                'exploitation_surface' => 40089,
                'full_address' => "FES - MEKNES, BOULEMANE, BOULMANE (M)",
            ]
        ];

        foreach ($clientFiles as $clientFile) {
            $clientIds = $clientFile['client_ids'] ?? [];
            $productIds = $clientFile['product_ids'] ?? [];
            unset($clientFile['client_ids'], $clientFile['product_ids']);

            $clientFileRecord = ClientFile::create($clientFile);
            $clientFileId = $clientFileRecord->id;
            foreach ($clientIds as $clientId) {
                ClientPartner::create([
                    'client_id' => $clientId,
                    'client_file_id' => $clientFileId
                ]);
            }
            foreach ($productIds as $productId) {
                ClientFileProduct::create([
                    'product_id' => $productId,
                    'client_file_id' => $clientFileId
                ]);
            }
        }
    }

}
