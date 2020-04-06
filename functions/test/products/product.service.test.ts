import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock, Times} from 'moq.ts';
import {Product} from '../../src/models/product';
import {StockRepository} from '../../src/stock/stock.repository';
import {RepositoryTestHelper} from '../helpers/repository.test.helper';
import {DataTestHelper} from '../helpers/data.test.helper';

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


  it('Product Service needs a StockRepository and a ProductRepository', () => {
    const productServiceDefined = new ProductService(productRepository.object(), stockRepository.object());
    expect(productServiceDefined).toBe(productServiceDefined);
  });

  it('Product Service has a Create Function that expects a product as param that returns a Promise containing the product', async () => {
    const productAfter: Product = await productService.create(dataTestHelper.product1);
    expect(productAfter).toBe(dataTestHelper.product1);
  });


  it('When Product is created a new stock with count of 5 should be added to the stock collection', async () => {
    await productService.create(dataTestHelper.product1);
    stockRepository.verify(stockRepo => stockRepo.create(dataTestHelper.product1, 5), Times.Exactly(1));
  });

});
