import { useEffect } from "react";

const useUpdateEffect = (effect, dependencies = []) => {
  useEffect(() => {
    return effect();
  }, dependencies);
};
export default useUpdateEffect;
