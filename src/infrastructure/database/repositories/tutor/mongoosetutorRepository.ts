import { TutorProfileDto } from '../../../core/tutor/dto/tutorProfileDTO';
import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import ITutorRepository from '../../../../Domain/interfaces/tutor.interface';
import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import Category from 'src/Domain/entity/category.entity';

export class mongooseTutorRepository implements ITutorRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async UpdateProfile(userdata: TutorProfileDto) {
    console.log(userdata, 'from repository');

    try {
      const userDetails = await this.userModel.findById(userdata._id);

      if (userDetails) {
        if (userdata.Number !== '') {
          userDetails.phoneNumber = userdata.Number;
        }

        if (userdata.About !== '') {
          userDetails.about = userdata.About;
        }

        if (userdata.DOB) {
          userDetails.DOB = userdata.DOB;
        }

        if (userdata.githuburl) {
          const update = {
            $set: {
              'URLs.github': userdata.githuburl,
            },
          };

          await this.userModel.findByIdAndUpdate(userdata._id, update, {
            projection: {
              URLs: 1,
            },
          });
        }

        if (userdata.linkedinurl) {
          const update = {
            $set: {
              'URLs.linkedin': userdata.linkedinurl,
            },
          };

          await this.userModel.findByIdAndUpdate(userdata._id, update, {
            projection: {
              URLs: 1,
            },
          });
        }
        if (userdata.pinteresturl) {
          const update = {
            $set: {
              'URLs.pinterest': userdata.pinteresturl,
            },
          };

          await this.userModel.findByIdAndUpdate(userdata._id, update, {
            projection: {
              URLs: 1,
            },
          });
        }

        const userData = await userDetails.save();
        return { success: true, message: 'Successfully Updated!', userData };
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (err) {
      return { success: false, message: 'Server Error' };
    }
  }

  async addCategory(category: TutorCategoryDTO) {
    const userdetail = await this.userModel.findById(category.userId);

    const categoryDoc = await this.categoryModel.findById(category.categoryId);
    if (!categoryDoc) {
      return { success: false, message: 'Category not found' };
    }

    // Get the tags array from the user document or create a new array if it doesn't exist
    const tags = userdetail.tags || [];
    if (tags.length >= 3) {
      return { success: false, message: 'Maximum 3 tags allowed' };
    }
    // Check if the category ID is already in the tags array
    const index = tags.indexOf(category.categoryId);

    // If the category ID is not in the tags array, add it
    if (index === -1) {
      tags.push(category.categoryId);
    } else {
      return { success: false, message: 'Category already added' };
    }

    // Update the user document with the new tags array
    const update = {
      $set: {
        tags,
      },
    };

    await this.userModel.findByIdAndUpdate(category.userId, update);

    const tutordata = await this.userModel.findById(category.userId).populate({
      path: 'tags',
      model: 'Category',
    });

    return { success: true, message: 'Category Added Successfully', tutordata };
  }

  async removeCategory(category: TutorCategoryDTO) {
    try {
      const userdetail = await this.userModel.findById(category.userId);

      const categoryDoc = await this.categoryModel.findById(
        category.categoryId,
      );
      if (!categoryDoc) {
        return { success: false, message: 'Category not found' };
      }

      // Get the tags array from the user document or create a new array if it doesn't exist
      const tags = userdetail.tags || [];

      // Check if the category ID is in the tags array
      const index = tags.indexOf(category.categoryId);

      // If the category ID is in the tags array, remove it
      if (index !== -1) {
        tags.splice(index, 1);
      } else {
        return { success: false, message: 'Category not found in user tags' };
      }

      // Update the user document with the updated tags array
      const update = {
        $set: {
          tags,
        },
      };

      await this.userModel.findByIdAndUpdate(category.userId, update);

      const tutordata = await this.userModel
        .findById(category.userId)
        .populate({
          path: 'tags',
          model: 'Category',
        });

      return {
        success: true,
        message: 'Category Removed Successfully',
        tutordata,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while removing the category',
        error,
      };
    }
  }
}
