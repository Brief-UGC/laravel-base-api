<?php

declare(strict_types=1);

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuid
{
    /**
     * Perform any actions required after the model boots.
     */
    protected static function bootHasUuid(): void
    {
        static::creating(function (Model $model): void {
            $model->forceFill([
                'uuid' => (string) Str::uuid(),
            ])->saveQuietly();
        });
    }
}
