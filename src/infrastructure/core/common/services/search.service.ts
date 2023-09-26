import search_Query_useCase from 'src/Domain/usecase/common/search/searchUser';
import { searchQueryDTO } from '../DTO/search/searchQuerydto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class search_Service {
  private readonly searchQuery_useCase: search_Query_useCase;

  constructor(searchQuery_useCase: search_Query_useCase) {
    this.searchQuery_useCase = searchQuery_useCase;
  }

  public async Search(searchQuery: searchQueryDTO) {
    return await this.searchQuery_useCase.execute(searchQuery);
  }
}
