<?php

declare(strict_types=1);

namespace App\Enums;

enum UserType: int
{
    case DELETED = 0;
    case MEMBER = 1;
    case ADMIN = 110;
    case SYSTEM = 120;

    public static function values(): array
    {
        return array_column(UserType::cases(), 'value');
    }
}
