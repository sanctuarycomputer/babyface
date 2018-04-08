import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';

class StudiesContainer extends ContainerBase {
  view = import("views/StudiesShowView");

  model = () => {
    return ContentfulData.getEntries({
      content_type: 'study',
      include: 2
    }).then(res => {
      const slug = get(this, 'props.match.params.slug');
      return get(res, 'items', []).find(study => {
        return get(study, 'fields.slug') === slug;
      });
    });
  };
}

export default StudiesContainer;
