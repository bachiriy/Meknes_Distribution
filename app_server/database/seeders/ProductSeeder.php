<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @throws \Exception
     */
    public function run(): void
    {
        $products = [
            [
                'reference' => '#4533RGR',
                'designation' => 'Product test',
                'image' => 'product.png',
                'prix_tarif' => 12323,
                'prix_achat' => 342,
                'prix_vente' => 6586,
                'marge_brut' => 0.3,
                'remise' => 0.3,
                'TVA' => 0.3,
                'prix_vente_net' => 3434,
                'sub_category_id' => 4,
                'supplier_id' => 1
            ],
            [
                'reference' => '#4538568GR',
                'designation' => 'Product2 test',
                'image' => 'product2.png',
                'prix_tarif' => 12323,
                'prix_achat' => 342,
                'prix_vente' => 657,
                'marge_brut' => 0.3,
                'remise' => 0.3,
                'TVA' => 0.3,
                'prix_vente_net' => 3434,
                'sub_category_id' => 4,
                'supplier_id' => 1
            ],
            [
                'reference' => '#4kKJ3RGR',
                'designation' => 'Product3 test',
                'image' => 'product3.png',
                'prix_tarif' => 12323,
                'prix_achat' => 342,
                'prix_vente' => 4545,
                'marge_brut' => 0.3,
                'remise' => 0.3,
                'TVA' => 0.3,
                'prix_vente_net' => 3434,
                'sub_category_id' => 4,
                'supplier_id' => 1
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
