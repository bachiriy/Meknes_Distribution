<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\ClientFile;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionsSeeder::class,
            AdminSeeder::class,
            CitiesSeeder::class,
            CategorySeeder::class,
            SupplierSeeder::class,
            ClientSeeder::class,
            ProductSeeder::class,
            ClientFileSeeder::class,
        ]);
    }
}
