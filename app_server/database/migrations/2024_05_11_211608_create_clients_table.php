<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('CIN_ICE');
            $table->string('CIN_file')->nullable();
            $table->enum('type', ['Entreprise', 'Particulier']);
            $table->string('role');
            $table->string('raison_sociale')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('email');
            $table->string('address_exploitation');
            $table->string('suite_address_exploitation')->nullable();
            $table->string('address_facturation');
            $table->string('suite_address_facturation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
