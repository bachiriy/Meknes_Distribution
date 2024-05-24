<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'EQUIPEMENT AGRICOLE',
                'sub_categories' => [
                    'TRACTEUR',
                    "MATERIEL TRACTE DE TRAVAIL ET D'ENTRETIEN DU SOL",
                    "MATERIEL DE TRAVAIL ET D'ENTRETIEN DU SOL ANIME PAR TRACTEUR",
                    "MATERIEL DE SEMIS",
                    "MATERIEL DE PLANTATION",
                    "MATERIEL D'EPANDAGE D'ENGRAIS",
                    "MATERIEL DE TRAITEMENT PHYTOSANITAIRE",
                    "MATERIEL DE MOISSON",
                    "MATERIEL DE RECOLTE",
                    "AUTRE MATERIEL",
                    "MATERIEL DE TRANSPORT"
                ]
            ],
            [
                'name' => 'POMPAGE ET IRRIGATION',
                'sub_categories' => []
            ],
            [
                'name' => 'EQUIPEMENT INDUSTRIEL',
                'sub_categories' => []
            ],
        ];

        foreach ($categories as $category) {
            $category_id = Category::create(['name' => $category['name']]);
            foreach ($category['sub_categories'] as $subCategory) {
                SubCategory::create(
                    [
                        'name' => $subCategory,
                        'category_id' => $category_id->id
                    ]);
            }
        }
    }
}
