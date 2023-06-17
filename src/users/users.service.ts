import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, type UserDocument } from './users.schema.js';
import type { UserData } from './users.models.js';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	findByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email });
	}

	getAll(): Promise<UserData[] | null | undefined> {
		return this.userModel.find({});
	}

	create(data: UserData): Promise<User> {
		return this.userModel.create(data);
	}

	delete(email: string): Promise<any> {
		return this.userModel.deleteOne({ email });
	}

	update(data: UserData, _id: string): Promise<UserData | null> {
		return this.userModel.findOneAndUpdate({ _id }, data, { new: true });
	}
}
