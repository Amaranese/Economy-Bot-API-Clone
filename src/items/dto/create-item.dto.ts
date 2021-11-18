export class CreateItemDto {
  name: string;
  price: number;
  description: string;
  message: string;
  type: 'no role' | 'role';
  serverId: string;
}
