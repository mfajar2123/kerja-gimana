<script setup lang="ts">
import { ChevronDown, FileText, LayoutDashboard, LogOut, Settings2, ShieldCheck, UserRound, UsersRound } from '@lucide/vue'
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from 'reka-ui'

const { viewer, busy, signOut } = useAccount()
const route = useRoute()
const open = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
watch(() => route.fullPath, () => { open.value = false })
const label = computed(() => viewer.value?.role === 'admin' ? 'Menu akun admin' : 'Menu akun saya')
</script>

<template>
  <DropdownMenuRoot v-if="viewer" v-model:open="open" :modal="false">
    <DropdownMenuTrigger as-child>
      <UiButton variant="outline" class="account-trigger" :aria-label="label" :disabled="busy || !ready">
        <ShieldCheck v-if="viewer.role === 'admin'" data-icon="inline-start" aria-hidden="true" />
        <UserRound v-else data-icon="inline-start" aria-hidden="true" />
        <span class="account-trigger-copy"><span>{{ viewer.display_name }}</span><small>{{ viewer.role === 'admin' ? 'Admin' : 'Akun saya' }}</small></span>
        <ChevronDown class="account-chevron" data-icon="inline-end" aria-hidden="true" />
      </UiButton>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="account-menu" align="end" :side-offset="10" :collision-padding="16" aria-label="Pilihan akun">
        <DropdownMenuGroup>
          <DropdownMenuLabel class="account-menu-identity"><strong>{{ viewer.display_name }}</strong><span>{{ viewer.email }}</span><small>{{ viewer.role === 'admin' ? 'Administrator' : 'Pengguna' }}</small></DropdownMenuLabel>
          <DropdownMenuSeparator class="account-menu-separator" />
          <DropdownMenuItem v-if="viewer.role === 'admin'" as-child><NuxtLink class="account-menu-item" to="/admin"><ShieldCheck aria-hidden="true" /> Ruang admin</NuxtLink></DropdownMenuItem>
          <DropdownMenuItem as-child><NuxtLink class="account-menu-item" to="/dashboard"><LayoutDashboard aria-hidden="true" /> Dashboard saya</NuxtLink></DropdownMenuItem>
          <DropdownMenuItem as-child><NuxtLink class="account-menu-item" to="/dashboard/review"><FileText aria-hidden="true" /> Kontribusi saya</NuxtLink></DropdownMenuItem>
          <DropdownMenuItem as-child><NuxtLink class="account-menu-item" to="/dashboard/pengaturan"><Settings2 aria-hidden="true" /> Profil dan pengaturan</NuxtLink></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator class="account-menu-separator" />
        <DropdownMenuGroup>
          <DropdownMenuItem class="account-menu-item" :disabled="busy" @select="signOut('/masuk?status=switched-account')"><UsersRound aria-hidden="true" /> Keluar dan ganti akun</DropdownMenuItem>
          <DropdownMenuItem class="account-menu-item" :disabled="busy" @select="signOut()"><LogOut aria-hidden="true" /> Keluar</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
