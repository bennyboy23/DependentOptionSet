///<reference path="MSXRMTOOLS.Xrm.Page.2016.js"/>
if (OptionSet === undefined) {
    var OptionSet = {};
    var source;
    var secondarySource;
    //   console.log("namespace generated");
}
OptionSet.onLoad = function (parentOptionSet, childOptionSet) {
    source = Xrm.Page.getAttribute(parentOptionSet);
    secondarySource = Xrm.Page.getAttribute(childOptionSet);
    // console.log("sources discovered");
    if (source.getValue() === null) {
        Xrm.Page.getControl(childOptionSet).setDisabled(true);
    }
    else {
        OptionSet.Init(parentOptionSet, childOptionSet);
    }
    //Xrm.Utility.alertDialog(childOptionSet);
}
Optionset.Init = function (parentOptionSet, childOptionSet) {
    var secondarySourceControl = Xrm.Page.getControl(childOptionSet);
    var secondarySourceOptions = secondarySourceControl.getOptions();
    for (var i = 0; i < secondarySourceOptions.length; i++) {
        if (secondarySourceOptions[i].value.toString().substring(3, 6) !== source.getValue().toString().substring(3, 6)) {
            secondarySourceControl.removeOption(secondarySourceOptions[i].value);
            //console.log("hello");
        }
    }
}
Optionset.DependentOptionSet = function (parentOptionSet, childOptionSet) {
    var sourceValue = source.getValue();
    var childOptionSetControl = Xrm.Page.getControl(childOptionSet);
    if (sourceValue === "" || sourceValue === -1 || sourceValue == null) {
        childOptionSetControl.clearOptions();
        Xrm.Page.getControl(childOptionSet).setDisabled(true);
        return;
    }
    if (Xrm.Page.getControl(childOptionSet).getDisabled()) {
        Xrm.Page.getControl(childOptionSet).setDisabled(false);
    }
    var sourceValueString = sourceValue.toString();
    // console.log(sourceValue);
    var sourceValueSubstring = sourceValueString.substring(3, 6);
    var secondarySourceOptions = secondarySource.getOptions();
    childOptionSetControl.clearOptions();
    for (var i = 0; i < secondarySourceOptions.length; i++) {
        if (secondarySourceOptions[i].value !== null) {
            var secondarySourceSubString = secondarySourceOptions[i].value.toString().substring(3, 6);
            if (secondarySourceSubString === sourceValueSubstring) {
                //console.log(secondarySourceOptions[i]);
                childOptionSetControl.addOption(secondarySourceOptions[i], i);
            }
        }
    }
}
