import { ParseCloudCodePublisher } from '../LiveQuery/ParseCloudCodePublisher';
import { LiveQueryOptions } from '../Options';
export class LiveQueryController {
  classNames: any;
  liveQueryPublisher: any;

  constructor(config: ?LiveQueryOptions) {
    // If config is empty, we just assume no classs needs to be registered as LiveQuery
    if (!config || !config.classNames) {
      this.classNames = new Set();
    } else if (config.classNames instanceof Array) {
      this.classNames = new Set(config.classNames);
    } else {
      throw 'liveQuery.classes should be an array of string';
    }
    this.liveQueryPublisher = new ParseCloudCodePublisher(config);
  }

  onAfterSave(
    className: string,
    currentObject: any,
    originalObject: any,
    classLevelPermissions: ?any
  ) {
    if (!this.hasLiveQuery(className)) {
      return;
    }
    const req = this._makePublisherRequest(
      currentObject,
      originalObject,
      classLevelPermissions
    );
    this.liveQueryPublisher.onCloudCodeAfterSave(req);
  }

  onAfterDelete(
    className: string,
    currentObject: any,
    originalObject: any,
    classLevelPermissions: any
  ) {
    if (!this.hasLiveQuery(className)) {
      return;
    }
    const req = this._makePublisherRequest(
      currentObject,
      originalObject,
      classLevelPermissions
    );
    this.liveQueryPublisher.onCloudCodeAfterDelete(req);
  }

  hasLiveQuery(className: string): boolean {
    // 20190308 remove the restriction to allow all object's live query
    this.classNames.has(className);

    return !className.startsWith('_');
  }

  _makePublisherRequest(
    currentObject: any,
    originalObject: any,
    classLevelPermissions: ?any
  ): any {
    // 20190508 do not reveal data field in livequery event but only id field
    const req = {
      object: this._makeObject(currentObject),
    };
    if (currentObject) {
      req.original = originalObject
        ? this._makeObject(originalObject)
        : originalObject;
    }
    if (classLevelPermissions) {
      req.classLevelPermissions = classLevelPermissions;
    }
    return req;
  }

  _makeObject(source: any): any {
    return {
      id: source['id'],
      _toFullJSON: () => {
        return {
          id: source['id'],
          __type: 'Object',
          className: source['className'],
        };
      },
    };
  }
}

export default LiveQueryController;
