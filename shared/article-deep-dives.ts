import type { ArticleSection } from './articles'
import { karierDeepDives } from './deep-dives/01-karier'
import { cariKerjaDeepDives } from './deep-dives/02-cari-kerja'
import { hakKerjaDeepDives } from './deep-dives/03-hak-kerja'
import { wawancaraGajiDeepDives } from './deep-dives/04-wawancara-gaji'
import { kesalahanSatu } from './deep-dives/05-kesalahan-1'
import { kesalahanDua } from './deep-dives/06-kesalahan-2'

const sources = [karierDeepDives, cariKerjaDeepDives, hakKerjaDeepDives, wawancaraGajiDeepDives, kesalahanSatu, kesalahanDua]
const combined: Record<string, ArticleSection[]> = {}

for (const source of sources) {
  for (const [slug, sections] of Object.entries(source)) {
    combined[slug] = [...(combined[slug] ?? []), ...sections]
  }
}

export const articleDeepDives = combined
