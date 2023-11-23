import { Duel } from '../domain/Duel';
import { DuelRepository } from '../domain/DuelRepository';

export class DuelGetter {
  constructor(private readonly duelRepository: DuelRepository) {}

  async run(username: string, banlistname?: string): Promise<Duel[]> {
    return this.duelRepository.get(username, banlistname);
  }
}
