<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('reference');
            $table->string('designation');
            $table->string('image');
            $table->float('prix_tarif');
            $table->float('prix_achat');
            $table->float('prix_vente');
            $table->float('marge_brut');
            $table->float('remise');
            $table->float('TVA');
            $table->float('prix_vente_net');
            $table->foreignId('group_id')->constrained()->cascadeOnDelete();
            $table->foreignId('supplier_id')->constrained()->cascadeOnDelete();
            $table->enum('is_deleted', ['no', 'yes'])->default('no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
