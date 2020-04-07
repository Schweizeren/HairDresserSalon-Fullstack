import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {Product} from '../../src/models/product';
import {StockRepository} from '../../src/stock/stock.repository';
import {RepositoryTestHelper} from '../helpers/repository.test.helper';
import {DataTestHelper} from '../helpers/data.test.helper';
import {IMock, Times} from 'moq.ts';

describe('ProductService', () => {
  let dataTestHelper: DataTestHelper;
  let repoTestHelper: RepositoryTestHelper;
  let productRepository: IMock<ProductRepository>;
  let stockRepository: IMock<StockRepository>;
  let productService: ProductService;
  beforeEach(() => {
    dataTestHelper = new DataTestHelper();
    repoTestHelper = new RepositoryTestHelper(dataTestHelper);
    productRepository = repoTestHelper.getProductRepositoryMock();
    stockRepository = repoTestHelper.getStockRepositoryMock();
    productService = new ProductService(productRepository.object(), stockRepository.object());
  });

  it('Product Service has a Create Function that expects a product as param that returns a Promise containing the product', async () => {
    const productAfter: Product = await productService.create(dataTestHelper.product1);
    expect(productAfter).toBe(dataTestHelper.product1);
  });


  it('adding a product to the collection creates 5 copies of it in stock', async () => {
    await productService.create(dataTestHelper.product1);
    stockRepository.verify(stockRepo => stockRepo.create(dataTestHelper.product1, 5), Times.Exactly(1));
  });

  it('buying a product increases times purchased', async () => {
      const product = dataTestHelper.getProduct2();
      const beforePurchased = product.timesPurchased;
      expect(beforePurchased).toBe(0);
      const productAfter: Product = productService.buy(product);
      const afterPurchased = productAfter.timesPurchased;
      expect(afterPurchased).toBe(1);
    }

  );

  it('Refunding a product subtracts one from timesPurchased', async () => {
    const product = dataTestHelper.getProduct2();
    product.timesPurchased++;
    const beforeRefunded = product.timesPurchased;
    expect(beforeRefunded).toBe(1);
    const productAfter: Product = productService.refund(product);
    const afterRefunded = productAfter.timesPurchased;
    expect(afterRefunded).toBe(0);
  });

  it('When changing the name of a product the name must not be empty and has to exist', async() => {
    const productBefore = dataTestHelper.product1;
    const productAfter = dataTestHelper.product1;
    productAfter.name = '';
    await expect(() => {productService.updateStockProductName(productAfter.uId, productBefore, productAfter)}).rejects;
  });


});
