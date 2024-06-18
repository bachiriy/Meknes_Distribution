<?php

namespace Database\Seeders;

use App\Models\ClientFileAddress;
use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $contents = Storage::disk('public')->get('T_ADRESSE.txt');
        $lines = explode("\n", $contents);

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) {
                continue;
            }
            $fields = str_getcsv($line);
            foreach ($fields as &$field) {
                $field = trim($field);
                $field = preg_replace('/[[:^print:]]/', '', $field);
                $field = mb_convert_encoding($field, 'UTF-8', 'auto');
            }
            $regionName = $fields[1];
            $prefProvName = $fields[2];
            $cercleName = $fields[3];
            $caidatName = $fields[4];
            $communeName = $fields[5];

            DB::transaction(function () use ($regionName, $prefProvName, $cercleName, $caidatName, $communeName) {
                // Check if the region exists, if not, create it
                $region = Region::firstOrCreate(['name' => $regionName]);
                $prefProv = $region->provinces()->firstOrCreate(['name' => $prefProvName]);
                $cercle = $prefProv->cercles()->firstOrCreate(['name' => $cercleName]);
                $caidat = $cercle->caidats()->firstOrCreate(['name' => $caidatName]);
                $commune = $caidat->communes()->firstOrCreate(['name' => $communeName]);

                $addressParts = [$regionName, $prefProvName, $cercleName, $caidatName, $communeName];

                // Remove modifiers like (M)
                $normalizedAddressParts = array_map(function ($name) {
                    return preg_replace('/\s*\(.*?\)$/', '', $name);
                }, $addressParts);

                // Remove duplicates and unnecessary repeated parts
                $uniqueNormalizedAddressParts = array_values(array_unique(array_reverse($normalizedAddressParts)));

                $fullAddress = implode(', ', array_reverse($uniqueNormalizedAddressParts));

                ClientFileAddress::create([
                    'full_address' => $fullAddress,
                    'commune_id' => $commune->id
                ]);
            });
        }
    }
}
