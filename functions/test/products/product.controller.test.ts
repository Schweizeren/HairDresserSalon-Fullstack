import {IMock, Mock} from 'moq.ts';
import {ProductService} from '../../src/products/product.service';
import {ProductControllerFirebase} from '../../src/products/product.controller.firebase';
import {Product} from '../../src/models/product';

describe('ProductController', () => {
  let productServiceMock: IMock<ProductService>;
  let productController: ProductControllerFirebase;
  const productBefore: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, uId: 'ab'};
  const productAfter: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, uId: 'ab'};
  beforeEach(() => {
    productServiceMock = new Mock<ProductService>();
    productServiceMock.setup(ps => ps.writeProducts('ab', productBefore, productAfter))
      .returns(new Promise((resolve, reject) => {resolve(); }));
    productController = new ProductControllerFirebase(productServiceMock.object());
  });

  it('Init Test', async () => {
    // snap: Change<DocumentSnapshot>, context: EventContext
    interface Data {
      data(): Product;
    }
    interface ChangedStub {
      before: Data;
      after: Data;
    }
    const mockedDataBefore = new Mock<Data>()
      .setup(mdb => mdb.data())
      .returns(productBefore);
    const mockedDataAfter = new Mock<Data>()
      .setup(mdb => mdb.data())
      .returns(productAfter);

    const mockedChanged = new Mock<ChangedStub>()
      .setup(mc => mc.before)
      .returns(mockedDataBefore.object())

      .setup(mc => mc.after)
      .returns(mockedDataAfter.object());

    interface Params {
      prodId: string;
    }
    interface Context {
      params: Params;
    }
    const mockedParams = new Mock<Params>()
      .setup(params => params.prodId)
      .returns('ab');
    const mockedContext = new Mock<Context>()
      .setup(con => con.params)
      .returns(mockedParams);

    await productController.writtenProducts(mockedChanged.object() as any, mockedContext.object() as any);

  });
});
