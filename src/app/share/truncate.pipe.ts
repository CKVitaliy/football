import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const finish = args.length > 0 ? parseInt(args[0], 10) : 10;
    return value.length > finish ? value.substring(0, finish) + '...' : value;
  }

}
