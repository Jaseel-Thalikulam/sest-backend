export class PollDataDto {
  readonly userId: string;
  readonly timeStamp: string;
  readonly type: string;
  readonly pollQuestion: string;
  readonly pollOptions: string[];
  readonly pollVotes: number[];
  readonly totalVotes: number[];
}
