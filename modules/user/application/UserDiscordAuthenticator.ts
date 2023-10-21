import { User, UserPresentation } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserDiscordAuthenticator {
	constructor(private readonly userRepository: UserRepository) {}

	async run(id: string, email: string): Promise<UserPresentation | null> {
		const user = await this.userRepository.findByEmail(email);

		if(!user) {
			throw new Error(`User ${email} not found.`)
		}

		if(!user.discordId) {
			await this.userRepository.save(new User({
				...user.toPresentation(),
				...user,
				discordId: id
			}))
		}

		return user.toPresentation();
	}
}