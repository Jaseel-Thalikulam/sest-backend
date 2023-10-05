/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { searchQueryDTO } from 'src/infrastructure/core/common/DTO/search/searchQuerydto';
declare class search_Query_useCase {
    private userRepository;
    constructor(userRepository: mongooseUserRepository);
    execute(data: searchQueryDTO): Promise<(import("mongoose").Document<unknown, {}, import("../../../entity/user.entity").default> & import("../../../entity/user.entity").default & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
}
export default search_Query_useCase;
