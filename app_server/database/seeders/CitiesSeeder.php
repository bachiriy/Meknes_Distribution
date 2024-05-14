<?php

namespace Database\Seeders;

use App\Models\PrefProv;
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
    public function run(): void
    {
        $contents = Storage::get('T_ADRESSE.txt');
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

                // Check if the PrefProv exists under this region, if not, create it
                $prefProv = $region->provinces()->firstOrCreate(['name' => $prefProvName]);

                // Check if the Cercle exists under this PrefProv, if not, create it
                $cercle = $prefProv->cercles()->firstOrCreate(['name' => $cercleName]);

                // Check if the Caidat exists under this Cercle, if not, create it
                $caidat = $cercle->caidats()->firstOrCreate(['name' => $caidatName]);

                // Check if the Commune exists under this Caidat, if not, create it
                $commune = $caidat->communes()->firstOrCreate(['name' => $communeName]);
            });
        }
    }
}
