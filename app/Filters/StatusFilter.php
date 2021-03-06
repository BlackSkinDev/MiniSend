<?php

namespace App\Filters;


use Closure;
use App\Interfaces\IFilters;

class StatusFIlter implements IFilters
{

    public function filter($query, Closure $next)
    {
        if (request()->status) {
            $query->where('status', request()->status);
        }
        return $next($query);
    }

}
