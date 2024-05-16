<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Group;
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
                'groups' => [
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
                'groups' => []
            ],
            [
                'name' => 'EQUIPEMENT INDUSTRIEL',
                'groups' => []
            ],
        ];

        foreach ($categories as $category) {
            $category = Category::create(['name' => $category['name']]);
            foreach ($category['groups'] as $group) {
                Group::create(
                    [
                        'name' => $group,
                        'category_id' => $category->id
                    ]);
            }
        }
    }
}
