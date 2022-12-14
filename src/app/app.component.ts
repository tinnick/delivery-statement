import { Component } from '@angular/core';

type Item = {
  nameId: string;
  name: string;
  quantity: number;
  price: number;
  shippingFee: number;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly A4AspectRatio = {
    x: 1,
    y: Math.SQRT2,
  };

  public readonly A4DPI = 300; // this is the bare minimum for printing: https://www.makeuseof.com/dpi-settings-for-digital-photos/

  public readonly customer = {
    name: 'Customer A',
    zipcode: '〒107-0061',
    country: '日本',
    addressLine1: '東京都港区北青山1丁目4-5',
    addressLine2: "VORT青山一丁目 Dual's 301",
    phone: '+81-080-4321-1234',
    email: 'taniavon@mail.com',
  };

  public readonly orderDate = Intl.DateTimeFormat('ja', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  public readonly shop = {
    name: 'Shop ABC',
    zipcode: '〒107-0061',
    country: '日本',
    addressLine1: '東京都港区北青山1丁目4-5',
    addressLine2: "VORT青山一丁目 Dual's 301",
    phone: '+81-080-4321-1234',
    email: 'taniavon@mail.com',
  };

  public readonly itemsHeader = [
    '注文番号',
    '商品名/品目',
    '数量',
    '単価',
    '送料',
    '金額(税込)',
  ];

  public readonly items: Item[] = [
    {
      nameId: 'pjiDhwXjW1GYfMzi',
      name: '商品A',
      quantity: 1,
      price: 10000,
      shippingFee: 750,
    },
  ];

  public readonly totalValue = '¥11,825';
  public readonly totalValueLength: number;

  public image?: string;

  private readonly inchInPixels = 96;

  public get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  private get width(): number {
    return Math.round(this.inchInPixels * this.A4DPI * this.A4AspectRatio.x);
  }

  private get height(): number {
    return Math.round(this.inchInPixels * this.A4DPI * this.A4AspectRatio.y);
  }

  constructor() {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
    context.font = 'bold 24px/1 sans-serif';

    this.totalValueLength = context.measureText(this.totalValue).width;
  }

  public downloadPDF(svg: HTMLElement, canvas: HTMLCanvasElement): void {
    const blob = new Blob([svg.outerHTML], {
      type: 'image/svg+xml;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const image = document.createElement('img');

    image.addEventListener('load', () => {
      URL.revokeObjectURL(url);

      this.image = image.src;
      
      const context = canvas.getContext('2d');
      context.drawImage(image, 1000, 1000);
    }, {
      once: true,
    });

    image.src = url;
  }
}
