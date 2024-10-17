import { SelectQueryBuilder } from 'typeorm';
import { PageRequestDto } from '../dto/page-request.dto';

export function encodeCursor(cursor: string | number) {
  return Buffer.from(String(cursor)).toString('base64');
}

export function decodeCursor(cursor: string) {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  pageRequest: PageRequestDto,
) {
  qb.orderBy(`entity.createdAt`, 'DESC').take(pageRequest.count + 1);

  if (pageRequest.cursor) {
    qb.andWhere(`entity.createdAt < :cursor`, {
      cursor: new Date(decodeCursor(pageRequest.cursor)),
    });
  }

  const items = await qb.getMany();

  let hasNextPage = false;
  if (items.length > pageRequest.count) {
    hasNextPage = true;
    items.pop(); // 추가로 가져온 1개 제거
  }

  const nextCursor = hasNextPage
    ? (items[items.length - 1]['createdAt'] as unknown as string)
    : null;

  return {
    data: items,
    meta: {
      nextCursor: nextCursor ? encodeCursor(nextCursor) : null,
      hasNextPage,
    },
  };
}
