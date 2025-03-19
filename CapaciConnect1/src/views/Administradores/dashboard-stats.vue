<script setup lang="ts">
import { Users, ShoppingCart, FileText, DollarSign } from "lucide-vue-next"
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <!-- Total Users Card -->
    <div class="rounded-lg border bg-card text-card-foreground p-6">
      <div class="flex items-center justify-between pb-2 space-y-0">
        <span class="text-sm font-medium">Total Users</span>
        <Users class="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div class="text-2xl font-bold">1,248</div>
        <p class="text-xs text-muted-foreground">+12% from last month</p>
      </div>
    </div>

    <!-- Revenue Card -->
    <div class="rounded-lg border bg-card text-card-foreground p-6">
      <div class="flex items-center justify-between pb-2 space-y-0">
        <span class="text-sm font-medium">Revenue</span>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div class="text-2xl font-bold">$45,231.89</div>
        <p class="text-xs text-muted-foreground">+7.2% from last month</p>
      </div>
    </div>

    <!-- Orders Card -->
    <div class="rounded-lg border bg-card text-card-foreground p-6">
      <div class="flex items-center justify-between pb-2 space-y-0">
        <span class="text-sm font-medium">Orders</span>
        <ShoppingCart class="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div class="text-2xl font-bold">624</div>
        <p class="text-xs text-muted-foreground">+4% from last month</p>
      </div>
    </div>

    <!-- Content Items Card -->
    <div class="rounded-lg border bg-card text-card-foreground p-6">
      <div class="flex items-center justify-between pb-2 space-y-0">
        <span class="text-sm font-medium">Content Items</span>
        <FileText class="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div class="text-2xl font-bold">132</div>
        <p class="text-xs text-muted-foreground">+8% from last month</p>
      </div>
    </div>
  </div>
</template>
