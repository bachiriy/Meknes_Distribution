<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
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
        ];

        foreach ($groups as $group) {
            Group::create(
                [
                    'name' => $group
                ]);
        }
    }
}
