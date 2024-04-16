/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TABLE {
  type Table = {
    [x: string]: ReactNode;
    _id: ReactNode;
    id: number;
    name: string;
    groups: string;
    active: string;
    phone: string;
    gmail: string;
  };

  type TablesResponse = Table[];
  type TablesRequest = void;
}
