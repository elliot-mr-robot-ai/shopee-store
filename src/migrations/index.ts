import * as migration_20260322_233123_initial from './20260322_233123_initial';
import * as migration_20260406_160705_add_produtos from './20260406_160705_add_produtos';
import * as migration_fix_produtos_schema from './fix_produtos_schema';

export const migrations = [
  {
    up: migration_20260322_233123_initial.up,
    down: migration_20260322_233123_initial.down,
    name: '20260322_233123_initial',
  },
  {
    up: migration_20260406_160705_add_produtos.up,
    down: migration_20260406_160705_add_produtos.down,
    name: '20260406_160705_add_produtos'
  },
  {
    up: migration_fix_produtos_schema.up,
    down: migration_fix_produtos_schema.down,
    name: 'fix_produtos_schema',
  },
];
