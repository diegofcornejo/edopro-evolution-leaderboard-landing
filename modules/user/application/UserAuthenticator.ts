import { UserPresentation } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserAuthenticator {
	constructor(private readonly userRepository: UserRepository) {}

	async run(username: string, password: string): Promise<UserPresentation | null> {
		const user = await this.userRepository.findByUsername(username);

		if(!user) {
			return null
		}

		if(user.password !== password) {
			return null
		}

		return user.toPresentation();
	}
}