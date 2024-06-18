<?php

namespace Database\Seeders;

use App\Models\ClientFileAddress;
use Illuminate\Database\Seeder;

class FullAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClientFileAddress::chunk(1000, function ($addresses) {
            foreach ($addresses as $address) {
                // Remove the (M) string
                $cleanedAddress = str_replace('(M)', '', $address->full_address);

                // Split the address into parts, remove duplicates, and trim spaces
                $addressParts = array_unique(array_map('trim', preg_split('/\s*,\s*/', $cleanedAddress, -1, PREG_SPLIT_NO_EMPTY)));

                // Reconstruct the full address
                $updatedFullAddress = implode(', ', $addressParts);

                // Update the address if it has changed
                if ($updatedFullAddress !== $address->full_address) {
                    $address->update(['full_address' => $updatedFullAddress]);
                }
            }
        });
    }
}
