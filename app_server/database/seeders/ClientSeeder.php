<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = [
            [
                'CIN_ICE' => 'AB5445',
                'CIN_file' => 'cin.png',
                'type' => 'Entreprise',
                'role' => 'dev',
                'first_name' => 'test1',
                'last_name' => 'test1',
                'email' => 'test1@gmail.com',
                'phone' => '232345667878',
                'address_exploitation' => 'hay kada kada ...',
                'address_facturation' => 'hda dik lblassa 3qlti',
            ],
            [
                'CIN_ICE' => 'AE232445',
                'CIN_file' => 'cin.png',
                'type' => 'Entreprise',
                'role' => 'gerant',
                'first_name' => 'test2',
                'last_name' => 'test2',
                'email' => 'test2@gmail.com',
                'phone' => '232345667878',
                'address_exploitation' => 'hay kada kada ...',
                'address_facturation' => 'hda dik lblassa 3qlti',
            ],
            [
                'CIN_ICE' => 'AE232445',
                'CIN_file' => 'cin.png',
                'type' => 'Entreprise',
                'role' => 'gerant',
                'first_name' => 'test2',
                'last_name' => 'test2',
                'email' => 'test2@gmail.com',
                'phone' => '232345667878',
                'address_exploitation' => 'hay kada kada ...',
                'address_facturation' => 'hda dik lblassa 3qlti',
            ]
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }
    }
}
